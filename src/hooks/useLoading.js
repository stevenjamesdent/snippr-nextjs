import { useState } from "react";

const useLoading = (action, timeout_duration = 25000) => {
    const [loading, set_loading] = useState(false);

    const do_action = (...args) => {
        set_loading(true);

        return new Promise((resolve, reject) => {
            const message = `Warning: useLoading timed out after ${timeout_duration / 1000} seconds`;
            const timeout_timer = setTimeout(() => {
                if (loading) {
                    set_loading(false);
                    reject(message);
                    console.warn(message);
                };
            }, timeout_duration);

            resolve(
                action(...args).finally(() => {
                    set_loading(false);
                    clearTimeout(timeout_timer);
                })
            );
        });
    }

    return [do_action, loading];
};

export default useLoading;