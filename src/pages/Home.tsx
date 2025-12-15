import HeaderComponent from "../components/HeaderComponent";
import DataGridDemo from "../components/TableComponent";

export const HomeApp = () => {
    return(
        <>
        <HeaderComponent />
            <div style={{padding: 15}}>
                <DataGridDemo></DataGridDemo>
            </div>
        </>
    );
}
