import { Container } from "@/components/shared/Container/Container";
import { AuthForm } from "./AuthForm";

export const Auth = () => {
  return (
    <main className="h-full">
      <section className="h-full">
        <Container classNames="flex flex-col items-center justify-center h-full">
          <AuthForm />
        </Container>
      </section>
    </main>
  );
};
