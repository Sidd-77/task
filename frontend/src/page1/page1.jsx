import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Page1 = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("")
  let [stdin, setStdin] = useState("")
  let [srccode, setSrcscode] = useState("")
  const [value, setValue] = useState(new Set([]));
  let backend_url = import.meta.env.VITE_BACKEND_URL;
  let langs = [
    {
      label: "C++",
      value: "C++",
    },
    {
      label: "Java",
      value: "Java",
    },
    {
      label: "Python",
      value: "Python",
    },
    {
      label: "Javascript",
      value: "Javascript",
    },
  ];

  const handlesubmit =  async () =>{
    let res = await axios.post(backend_url+'/submit',{
      username,
      value,
      stdin,
      srccode
    })
    setSrcscode("")
    setStdin("")
    setUsername("")
    setValue(new Set([]))
    navigate('/table')
    console.log(res)
  }

  return (
    <div>
      <Card className=" m-2 ">
        <CardHeader>Enter following fields:</CardHeader>
        <Divider/>
        <CardBody className=" flex gap-4">
          <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Select
            label="Select Programing Language"
            variant="bordered"
            selectedKeys={value}
            className="max-w-xs"
            onSelectionChange={setValue}
          >
            {langs.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </Select>
          <p>You selected {value}</p>
          <Textarea
            label="Input for your program (stdin)"
            labelPlacement="outside"
            className=""
            onChange={e => setStdin(e.target.value)}
          />
          <Textarea
            label="Source Code"
            size="lg"
            minRows={10}
            labelPlacement="outside"
            className=""
            onChange={e => setSrcscode(e.target.value)}
          />
        <Button color="primary" onClick={handlesubmit}>
            Submit
        </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Page1;
