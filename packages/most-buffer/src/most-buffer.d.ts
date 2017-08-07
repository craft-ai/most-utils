import { Stream } from 'most';

export function buffer<T>(count: number): (stream: Stream<T>) => Stream<T[]>;
export default buffer;
