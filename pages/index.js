import Head from 'next/head';
import LoginPage from "./login-page/LoginPage";

export default function Home() {
  return (
    <div>
      <Head>
        <script src="//code.tidio.co/4udgwlioptkynymdw8lhqicwc7e6epji.js" async></script>
      </Head>

      <LoginPage />
    </div>
  );
}
