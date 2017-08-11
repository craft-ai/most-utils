import { Stream } from 'most';

export function nth<T>(index: number): (stream: Stream<T>) => Promise<T | undefined>;
export function first<T>(stream: Stream<T>): Promise<T | undefined>;
export function last<T>(stream: Stream<T>): Promise<T | undefined>;
