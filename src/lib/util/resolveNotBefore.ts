import sleep from './sleep';

export default async function <T>(task: () => T, timeInMs = 1000): Promise<T> {
  const [result] = await Promise.all([task(), sleep(timeInMs)]);
  return result;
}
