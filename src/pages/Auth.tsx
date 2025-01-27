import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message === "Invalid login credentials") {
            throw new Error("Email o contraseña incorrectos");
          } else if (error.message.includes("Email not confirmed")) {
            throw new Error("Por favor verifica tu correo electrónico antes de iniciar sesión");
          } else {
            throw error;
          }
        }

        // Verificar si el perfil existe
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", (await supabase.auth.getUser()).data.user?.id)
          .maybeSingle();

        if (profileError) {
          throw profileError;
        }

        if (!profile) {
          throw new Error("No se encontró el perfil del usuario");
        }
        
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nombre,
            },
          },
        });
        
        if (error) {
          if (error.message.includes("already registered")) {
            throw new Error("Este correo electrónico ya está registrado");
          } else {
            throw error;
          }
        }
        
        toast({
          title: "Registro exitoso",
          description: "Por favor verifica tu correo electrónico para activar tu cuenta",
        });
        
        // Reset form after successful signup
        setEmail("");
        setPassword("");
        setNombre("");
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-comic text-center">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="nombre" className="font-comic">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required={!isLogin}
                  className="font-comic"
                  disabled={loading}
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="font-comic">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-comic"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="font-comic">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="font-comic"
                disabled={loading}
                minLength={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full font-comic"
              disabled={loading}
            >
              {loading
                ? "Cargando..."
                : isLogin
                ? "Iniciar Sesión"
                : "Registrarse"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="w-full font-comic"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;