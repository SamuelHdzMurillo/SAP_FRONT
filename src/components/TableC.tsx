import {
  Button,
  Table,
  TableColumnsType,
  TablePaginationConfig,
  TableProps,
} from "antd";
import { AnyObject } from "antd/es/_util/type";

interface GeneralTableProps<T> {
  dataSource: T[];
  columns: TableColumnsType<AnyObject>;
  pagination: TablePaginationConfig;
  handleTableChange: TableProps<AnyObject>["onChange"];
  loading?: boolean;
  handleAdd?: () => void;
  children: string;
}

const TableC = <T,>({
  dataSource,
  columns,
  pagination,
  handleTableChange,
  loading,
  handleAdd,
  children,
}: GeneralTableProps<T>) => {
  // const [loading, setLoading] = useState(false);

  return (
    <>
      {handleAdd && (
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          {children}
        </Button>
      )}

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};
export default TableC;
