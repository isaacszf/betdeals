import { FaYoutubeSquare, FaGithubSquare } from "react-icons/fa";

import Logo from "../../components/Logo/Logo";

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
    <div className={styles.container}>
      <div className={styles.welcomeInfo}>
        <Logo />

        <h2>Bem vindo! 👋</h2>
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

        <a href="/deals" className={styles.goto}>
          Acessar Deals
        </a>
      </div>
    </div>
  );
}
