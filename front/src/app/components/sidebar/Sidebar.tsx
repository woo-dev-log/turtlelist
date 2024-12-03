import Image from "next/image";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <header className={styles.user}>
                <Image src="/window.svg" alt="glove" width={50} height={50}/>
                <div className={styles.userInfo}>
                    <div className={styles.nickname}>닉네임</div>
                    <div className={styles.email}>이메일@google.com</div>
                    <div className={styles.logout}>로그아웃</div>
                </div>
            </header>
            <button>새 목표</button>
            <ul>
                <li>일정</li>
                <li>나의 목표
                    <ul>
                        <li>넷플릭스 보기</li>
                        <li>일기장 쓰기</li>
                    </ul>
                </li>
                <li>테스트</li>
            </ul>
        </aside>
    )
}