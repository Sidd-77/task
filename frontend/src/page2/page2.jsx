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
  const [isloading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/getdata');
    console.log(res.data);
    setData(res.data);
    setIsLoading(false);
  };

  const getStdout = async (token) => {

    if (token === null) {
      return "nothing"
    }
    setIsLoading(true);
    const options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers: {
        'X-RapidAPI-Key': '7eb5617339mshc612bc23a4e3cf3p14c236jsndd4b8ce1b04c',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      }
    };
    const {data} = await axios.request(options);
    setIsLoading(false);
    return data.stdout
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-2">
      <Table  aria-label="Submission details table"  >
        <TableHeader >
          <TableColumn>Username</TableColumn>
          <TableColumn>Language</TableColumn>
          <TableColumn>Stdin</TableColumn>
          <TableColumn>Source Code</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Stdout</TableColumn >
          <TableColumn>Time</TableColumn >
        </TableHeader>
        <TableBody isloading={isloading}>
          {data.map((row, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.prog_lang}</TableCell>
                  <TableCell><Textarea size="sm" value={row.stdin} isReadOnly /></TableCell>
                  <TableCell><Textarea value={row.src_code} isReadOnly /></TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell><Textarea value={"fetching output..."} isReadOnly /></TableCell>
                  <TableCell>{row.timestamp}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page2;
