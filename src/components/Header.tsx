import Image from "next/image";
import "../css/globals.css";
import styles from "../css/page.module.css";
import githubLogo from "../assets/githubLogo.svg";


export default function Header(){

	return (
		<div className={styles.header}>	
			<h1 className={styles.page_title}>wei4r.type</h1>
			<a href="https://github.com/wei4r/wei4r.type" className={styles.github_link}>
				<Image src={githubLogo} alt="GitHubLink" className={styles.github_logo}/>
				<div style={{ fontSize: "16px" }}>Give me a star!</div>
			</a>
		</div>
	);
}