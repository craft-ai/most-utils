import { Stream } from 'most'

declare function buffer<T>(count: number): (stream: Stream<T>) => Stream<T[]>;
