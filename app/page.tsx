import Header, {
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "./_components/header";

export default async function Home() {
  return (
    <div className="w-full space-y-8 p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
        </HeaderLeft>
      </Header>
    </div>
  );
}
