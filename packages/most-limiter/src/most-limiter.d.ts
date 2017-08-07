import { Stream } from 'most'

declare function limiter<T>(interval: number, capacity: number): (stream: Stream<T>) => Stream<T>;
