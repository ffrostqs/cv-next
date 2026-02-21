"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "./store";
import type {
  BlocksState,
  EditorStoreState,
  LayoutTreeState,
} from "./store";

export type AutosavePayload = {
  layoutTree: LayoutTreeState;
  blocks: BlocksState;
};

export type AutosaveOptions = {
  save: (payload: AutosavePayload) => Promise<void>;
  getPayload?: (state: EditorStoreState) => AutosavePayload;
  onSuccess?: (payload: AutosavePayload) => void;
  onError?: (error: unknown) => void;
  debounceMs?: number;
  background?: boolean;
  idleTimeoutMs?: number;
  enabled?: boolean;
};

const DEFAULT_DEBOUNCE_MS = 800;
const DEFAULT_IDLE_TIMEOUT = 2000;

function defaultPayload(state: EditorStoreState): AutosavePayload {
  return {
    layoutTree: state.layoutTree,
    blocks: state.blocks,
  };
}

function scheduleIdle(
  callback: () => void,
  timeoutMs: number
): number {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    return window.requestIdleCallback(
      () => callback(),
      { timeout: timeoutMs }
    );
  }

  return window.setTimeout(callback, 0);
}

function cancelIdle(handle: number) {
  if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
    window.cancelIdleCallback(handle);
  } else {
    window.clearTimeout(handle);
  }
}

export function useEditorAutosave(options: AutosaveOptions) {
  const {
    save,
    getPayload = defaultPayload,
    onSuccess,
    onError,
    debounceMs = DEFAULT_DEBOUNCE_MS,
    background = true,
    idleTimeoutMs = DEFAULT_IDLE_TIMEOUT,
    enabled = true,
  } = options;

  const saveRef = useRef(save);
  const payloadRef = useRef(getPayload);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    saveRef.current = save;
    payloadRef.current = getPayload;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  }, [save, getPayload, onSuccess, onError]);

  useEffect(() => {
    if (!enabled) return;

    let debounceTimer: number | null = null;
    let idleHandle: number | null = null;
    let inFlight = false;
    let queued = false;
    const scheduleSave = () => {
      if (debounceTimer) {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(() => {
        if (idleHandle) {
          cancelIdle(idleHandle);
        }
        const run = () => {
          void runSave();
        };
        idleHandle = background ? scheduleIdle(run, idleTimeoutMs) : scheduleIdle(run, 0);
      }, debounceMs);
    };

    const runSave = async () => {
      const currentState = useEditorStore.getState();
      if (!currentState.dirty) return;

      if (inFlight) {
        queued = true;
        return;
      }

      inFlight = true;
      const revisionAtStart = currentState.revision;

      currentState.setAutosave({ status: "saving", error: null });
      currentState.setDirty(false);

      const payload = payloadRef.current(currentState);

      try {
        await saveRef.current(payload);
        const latestState = useEditorStore.getState();
        if (latestState.revision === revisionAtStart) {
          latestState.markSaved();
        } else {
          latestState.setAutosave({ status: "idle", error: null });
        }
        onSuccessRef.current?.(payload);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Autosave failed";
        useEditorStore
          .getState()
          .setAutosave({ status: "error", error: message });
        useEditorStore.getState().setDirty(true);
        onErrorRef.current?.(error);
      } finally {
        inFlight = false;
        if (queued) {
          queued = false;
          scheduleSave();
        }
      }
    };

    const unsubscribe = useEditorStore.subscribe(
      (state) => state.revision,
      () => {
        if (!useEditorStore.getState().dirty) return;
        scheduleSave();
      }
    );

    return () => {
      unsubscribe();
      if (debounceTimer) {
        window.clearTimeout(debounceTimer);
      }
      if (idleHandle) {
        cancelIdle(idleHandle);
      }
    };
  }, [background, debounceMs, enabled, idleTimeoutMs]);
}
