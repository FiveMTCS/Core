import { RefObject, useEffect } from 'react';

export type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: (event: AnyEvent) => void
): void {
	useEffect(() => {
		const listener = (event: AnyEvent) => {
			const el = ref?.current;

			if (el && !el.contains(event.target as Node)) {
				console.log(el.contains(event.target as Node));
				handler(event);
			}
		};

		document.addEventListener(`mousedown`, listener);
		document.addEventListener(`touchstart`, listener);

		return () => {
			document.removeEventListener(`mousedown`, listener);
			document.removeEventListener(`touchstart`, listener);
		};

		// Reload only if ref or handler changes
	}, [ref, handler]);
}

export default useOnClickOutside;
