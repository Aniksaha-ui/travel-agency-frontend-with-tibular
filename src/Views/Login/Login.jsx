import { useRef } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import useApi from "../../Hooks/useApi";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userInformationAtom } from "../../State/atoms";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInformationAtom);

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const api = useApi();
  const handleLogin = async (event) => {
    event.preventDefault();
    const req = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    const response = await api.login(req);
    console.log(response);
    if (response) {
      localStorage.setItem("token", response?.access_token);
      localStorage.setItem("user", response?.user);
      await setUserInfo(response?.user);
    }
    navigate("/");
  };

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img
              src="https://flynextbd.com/wp-content/uploads/2023/09/Fly-Next-PNG-abhaya-Lib-Font.png"
              height={36}
              alt
            />
          </a>
        </div>
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">Login to your account</h2>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                ref={emailRef}
                type="email"
                className="form-control"
                placeholder="your@email.com"
                autoComplete="off"
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Password
                <span className="form-label-description">
                  <a href="./forgot-password.html">I forgot password</a>
                </span>
              </label>
              <div className="input-group input-group-flat">
                <input
                  ref={passwordRef}
                  type="password"
                  className="form-control"
                  placeholder="Your password"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-check">
                <input type="checkbox" className="form-check-input" />
                <span className="form-check-label">
                  Remember me on this device
                </span>
              </label>
            </div>
            <div className="form-footer">
              <button
                onClick={handleLogin}
                type="submit"
                className="btn btn-primary w-100"
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="hr-text">or</div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <a href="#" className="btn w-100">
                  {/* Download SVG icon from http://tabler-icons.io/i/brand-github */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon text-github"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                  </svg>
                  Login with Github
                </a>
              </div>
              <div className="col">
                <a href="#" className="btn w-100">
                  {/* Download SVG icon from http://tabler-icons.io/i/brand-twitter */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon text-twitter"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
                  </svg>
                  Login with Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          Don't have account yet?{" "}
          <a href="./sign-up.html" tabIndex={-1}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
