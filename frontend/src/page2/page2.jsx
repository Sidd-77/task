import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

const Page2 = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/getdata');
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-2">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Username</TableColumn>
          <TableColumn>Language</TableColumn>
          <TableColumn>Stdin</TableColumn>
          <TableColumn>Source Code</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.prog_lang}</TableCell>
                  <TableCell><Textarea size="sm" value={row.stdin} isReadOnly /></TableCell>
                  <TableCell><Textarea value={row.src_code} isReadOnly /></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page2;
