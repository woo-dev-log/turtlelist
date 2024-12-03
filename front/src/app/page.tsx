import Sidebar from "./components/sidebar/Sidebar";
import styles from "./styles/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.main}>
        메인
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
