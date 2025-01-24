import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"

interface TableProps {
  agentData: { name: string; email: string; status: string }[];
  handleRowClick: (index: number) => void;
}
const AgentsTable: React.FC<TableProps> = ({ agentData, handleRowClick }) => {
  return (
    <div className="p-4 w-[800px] mx-auto">
      <Table className="w-full table-auto mt-4">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agentData.map((data, index) => (
            <TableRow key={index} onClick={() => handleRowClick(index)} className="cursor-pointer hover:bg-gray-100">
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgentsTable;
