import { useState } from "react";
import { useRequest } from "../../hooks/use-request";
import Router from "next/router";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setTimeout(async () => {
        await doRequest();
        setLoading(false);
      }, 2000);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          type="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          type="password"
        />
      </div>
      {errors}
      {loading && <div className="alert alert-info">Loading...</div>}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
