import { Stream } from 'most';

export default function buffer<T>(count: number): (stream: Stream<T>) => Stream<T[]>;
