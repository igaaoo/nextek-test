'use client';
import axios from "axios";

import { FormEvent, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import LoginSVG from "@/public/svg/login.svg";
import Image from "next/image";


export default function IndexPage() {
  const [errorUser, setErrorUser] = useState('');
  const [errorInputs, setErrorInputs] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (email == '' || password == '') {
      setErrorInputs(true);
      return;
    }
    if (email != '' || password != '') {
      setErrorInputs(false);
    }

    setLoading(true);

    // Login com email e senha
    axios.post('/api/auth', {
      email,
      password
    }).then((res) => {
      if (res.status === 200) {
        setLoginSuccess(true);
        setErrorUser('');
        login(res.data.token);
        window.location.href = '/';
        setLoading(false);
      }
    }
    ).catch((err) => {
      setErrorUser(err.response.data.message);
      setLoading(false);
    });
  }


  return (
    <div className="mt-20 flex w-full justify-center">
      <Card className=" flex flex-col items-center gap-2 p-4 lg:flex-row">
        <Image src={LoginSVG} alt="Login" width={300} />

        <div className="min-w-[300px]">
          <CardHeader>
            <CardTitle className="text-center text-xl">Realizar Login</CardTitle>
            <CardDescription className="text-center ">Email e Senha</CardDescription>
          </CardHeader>
          <CardContent>

            {/* Alertas */}
            {errorUser && <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                {errorUser}
              </AlertDescription>
            </Alert>}

            {errorInputs ? <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Preencha todos os campos
              </AlertDescription>
            </Alert> : null}

            {loginSuccess ? <Alert className="mb-4 border-green-500">
              <CheckCircle2 className="h-4 w-4 " color="green" />
              <AlertTitle className="text-green-500">Sucesso</AlertTitle>
              <AlertDescription className="text-green-500">
                Redirecionando para a página principal...
              </AlertDescription>
            </Alert> : null}


            <form
              onSubmit={handleSubmit}
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input id="login" placeholder="Email" onChange={(e) => {
                    setEmail(e.target.value);
                  }} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input id="password" placeholder="Senha" type="password" onChange={(e) => {
                    setPassword(e.target.value);
                  }} />
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => {
                  const loginInput = document.getElementById('login') as HTMLInputElement | null;
                  const passwordInput = document.getElementById('password') as HTMLInputElement | null;
                  if (loginInput && passwordInput) {
                    loginInput.value = '';
                    passwordInput.value = '';
                  }
                }
                }>Limpar</Button>

                {loading ? (
                  <Button type="button" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </Button>
                ) :
                  (<Button type="submit" >Entrar</Button>)
                }
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}