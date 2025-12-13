import { useRouteError } from 'react-router-dom';

const SomeThingWentWrong = () => {
  const error = useRouteError()
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>Something went wrong</h1>
      <p>We encountered an unexpected error.</p>

      <pre style={{ color: "red" }}>
        {error.statusText || error.message}
      </pre>
    </div>
  );
}

export default SomeThingWentWrong