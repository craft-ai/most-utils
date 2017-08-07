import { Stream } from 'most';

export function limiter<T>(interval: number, capacity?: number): (stream: Stream<T>) => Stream<T>;
export default limiter;
