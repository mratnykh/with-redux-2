declare global {
    interface globalThis {
        __SHARED_ZUSTAND_USED_CHANNELS__: Set<string>;
    }
}

export function isSupported() {
    return "BroadcastChannel" in globalThis;
}

export function share(store) {
    return (key, { ref = "shared-", initialize = false } = {}) => {
        const channelName = ref + "-" + key.toString();

        let channel = new BroadcastChannel(channelName);
        let externalUpdate = false;
        let timestamp = 0;

        let cleanup = store.subscribe((state) => state[key], (newVal) => {
            channel.postMessage({ timestamp: timestamp, state: store.getState()[key] });
        })

        channel.onmessage = (evt) => {
            if (evt.data === undefined) {
                channel.postMessage({ timestamp: timestamp, state: store.getState()[key] });
                return;
            }

            externalUpdate = true;
            timestamp = evt.data.timestamp;
            store.setState({ [key]: evt.data.state });
        };

        return () => {
            channel.close();
            cleanup();
        };
    }
}
