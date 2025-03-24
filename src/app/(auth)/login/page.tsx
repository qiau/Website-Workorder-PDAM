"use client";
import { Eye, EyeSlash, LockKey, UserCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { login } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Format email tidak valid.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError("Kata sandi harus minimal 8 karakter.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role_id", String(data.role_id));

      router.push(data.role_id === 1 ? "/admin" : "/user");
    } catch (err) {
      setError("Login gagal. Periksa email dan password.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen ">
      <Image
        src="/images/bg-wave.svg"
        alt="Background"
        fill
        priority
        className="object-contain object-bottom -z-10 opacity-30"
      />
      <div className="w-1/2 hidden lg:flex justify-center">
        <Image
          src="/images/airo-berlari.svg"
          alt="PDAM Surya Sembada"
          width={200}
          height={200}
          className="lg:w-[200px] xl:w-[300px] 2xl:w-[400px]"
        />
      </div>
      <div className="w-full px-4 md:px-0 md:max-w-md m-auto ">
        <h2 className="text-5xl font-semibold text-primary-500 text-center mb-10">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-8 rounded-3xl shadow-2xl shadow-grey-400 bg-standardWhite"
        >
          <div>
            <label
              htmlFor="email"
              className="text-primary-500 text-md font-medium"
            >
              Email
            </label>
            <div className="flex items-center py-3 border-b-2 border-primary-100 bg-grey-100  focus-within:border-primary-500 transition-all duration-300 ease-out">
              <span className="px-2 text-primary-500">
                <UserCircle size={24} />
              </span>
              <div className="h-4 border-r-2 border-grey-700"></div>
              <Input
                type={"email"}
                placeholder="Email"
                variant="auth"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && (
              <p className="text-red-500 text-sm text-start">{emailError}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-primary-500 text-md font-medium"
            >
              Kata Sandi
            </label>
            <div className="flex items-center py-3 border-b-2 border-primary-100 bg-grey-100  focus-within:border-primary-500 transition-all duration-300 ease-out">
              <span className="px-2 text-primary-500">
                <LockKey size={24} />
              </span>
              <div className="h-4 border-r-2 border-grey-700"></div>
              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Kata Sandi"
                variant="auth"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="px-2 text-primary-500 hover:text-primary-600 "
              >
                {isVisible ? <Eye size={24} /> : <EyeSlash size={24} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm text-start">{passwordError}</p>
            )}
          </div>
          <div>
            <Link
              href="/"
              className="text-primary-500 font-medium hover:underline"
            >
              Lupa kata sandi?
            </Link>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className={`w-full text-standardWhite p-3 font-medium bg-primary-500 rounded-lg hover:bg-primary-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
