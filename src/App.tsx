import HeaderComponent from "./components/HeaderComponent";
import DataGridDemo from "./components/TableComponent";

export const App = () => {
  return (
    <>
      <HeaderComponent />
      <div style={{padding: 15}}>
        <DataGridDemo></DataGridDemo>
      </div>
    </>
  );
}