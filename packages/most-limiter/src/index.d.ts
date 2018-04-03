import { Stream } from 'most';

export default function limiter<T>(interval: number, capacity?: number): (stream: Stream<T>) => Stream<T>;
