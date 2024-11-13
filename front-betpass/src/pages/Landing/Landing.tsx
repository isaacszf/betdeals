import { FaYoutubeSquare, FaGithubSquare } from "react-icons/fa";

import ContainerSidebar from "../../components/ContainerSidebar/ContainerSidebar";

import styles from "./landing.module.css";

const links = [
  {
    icon: <FaYoutubeSquare id={styles.yt} className={styles.icon} />,
    title: "Vídeo de Demonstração",
    desc: "Link do vídeo demonstrando as funcionalidades da aplicação.",
    url: "",
  },
  {
    icon: <FaGithubSquare id={styles.gt} className={styles.icon} />,
    title: "Repositório no Github",
    desc: "Repositório de todo o código e README da aplicação.",
    url: "",
  },
];

export default function Landing() {
  return (
    <ContainerSidebar>
      <div className={styles.welcomeInfo}>
        <h1>Bem vindo! 👋</h1>
        <p>
          Este é um projeto realizado por Isaac Souza para o desafio técnico da
          Betpass, focado em demonstrar habilidades essenciais no
          desenvolvimento de aplicações web e na implementação de
          funcionalidades práticas do dia a dia.
        </p>

        <div className={styles.links}>
          {links.map((link, index) => (
            <a className={styles.link} key={index} href={link.url}>
              {link.icon}
              <div>
                <h4>{link.title}</h4>
                <span>{link.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </ContainerSidebar>
  );
}
