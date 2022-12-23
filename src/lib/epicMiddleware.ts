const epicMiddleware = (link, storeFn, interval) => {
  const intervalId = setInterval(async () => {
    const response = await fetch(link);
    const data = await response.json()

    storeFn(data.count)
  }, interval)

  return () => clearInterval(intervalId);
}

export default epicMiddleware;
