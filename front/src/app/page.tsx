import CalendarPage from "./calendar/Calendar";
import styles from "@/styles/page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CalendarPage />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
