import {
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import DialogTable from "../components/DialogTable";
import { postScan } from "../services";
import { IScanRequest, IScanResponse } from "../types";
import { AxiosError } from "axios";

function Home () {
  const [sqli, setSqli] = useState(false);
  const [crypto, setCrypto] = useState(false);
  const [xss, setXss] = useState(false);
  const [pathVal, setPathVal] = useState("");
  const [open, setOpen] = useState(false);
  const [languageType, setLanguageType] = useState("golang");
  const [tablePayload, setTablePayload] = useState<IScanResponse | null>(null);
  const [checks, setChecks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [erroMenssage, setErroMenssage] = useState("");

  useEffect(() => {
    const updatedChecks: string[] = [];
    if (sqli) updatedChecks.push("SQLI");
    if (crypto) updatedChecks.push("CRYPTO");
    if (xss) updatedChecks.push("XSS");
    setChecks(updatedChecks);
  }, [sqli, crypto, xss]);
  

  const handleOpenCard = async () => {
    setOpen(true);
    setLoading(true);

    const body: IScanRequest = {
      path: pathVal,
      checks: checks,
      codeType: languageType,
    };

    await postScan(body)
      .then((res: IScanResponse) => {
        setLoading(false);
        if (res && res.issues) {
          setTablePayload(res);
        }
        else if (res && res.error) {
          setErroMenssage(res.error);
        }
      })
      .catch((err: AxiosError) => {
        setLoading(false);
        setErroMenssage(err.message);
      })
  };

  const onClose = () => {
    setOpen(false);
    setErroMenssage("");
    setTablePayload(null);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      spacing={4}
      style={{ backgroundColor: "white", borderRadius: "10px" }}
      xs={12}
      sm={12}
      md={5}
      lg={5}
    >
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <Typography variant="h6" color="#121185">
          Your security assesment for your project 
        </Typography>
        <Typography variant="h3" color="#121185">
          Security Scan
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <InputLabel>Insert folder path</InputLabel>
        <TextField
          onChange={(e) => setPathVal(e.target.value)}
          fullWidth
          placeholder="home/workspace/src/my-own-project"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <InputLabel>Code Type</InputLabel>
        <Select
          fullWidth
          value={languageType}
          onChange={(event) => setLanguageType(event.target.value as string)}
        >
          <MenuItem value={"golang"}>golang</MenuItem>
          <MenuItem value={"web"}>web</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12} sm={12} md={10} lg={10}>
        <FormGroup>
          {languageType === "golang" ? (
            <>
              <FormControlLabel
                control={
                  <Switch
                    checked={sqli}
                    onChange={(event) => setSqli(event.target.checked)}
                  />
                }
                label="SQL injection (SQLI)"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={crypto}
                    onChange={(event) => setCrypto(event.target.checked)}
                  />
                }
                label="Weak Cryptography (CRYPTO)"
              />
            </>
          ) : (
            <FormControlLabel
              control={
                <Switch
                  checked={xss}
                  onChange={(event) => setXss(event.target.checked)}
                />
              }
              label="Cross-site scripting (XSS)"
            />
          )}
        </FormGroup>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={10}
        lg={10}
        pb={5}
        display="grid"
        justifyItems="flex-end"
      >
        <Button
          disabled={pathVal === ""}
          onClick={handleOpenCard}
          variant="contained"
          style={{
            backgroundColor: "#6b34fd",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Scan
        </Button>


      </Grid>

      {open && (
        <DialogTable
          open={open}
          handleClose={onClose}
          payload={tablePayload}
          loading={loading}
          errorMessage={erroMenssage}
        />
      )}
    </Grid>
  );
}

export default Home;
