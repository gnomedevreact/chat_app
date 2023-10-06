import { Container } from "@/components/shared/Container/Container";
import { Chats } from "./Chats";

export const Home = () => {
  return (
    <main>
      <section>
        <Container>
          <Chats />
        </Container>
      </section>
    </main>
  );
};
