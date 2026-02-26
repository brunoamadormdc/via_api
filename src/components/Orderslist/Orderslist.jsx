import { useState, useCallback } from "react";
import useOrders from "@/hooks/useOrders";
import {
  Container,
  Text,
  Badge,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import Header from "@/components/Header/Header";
import Filter from "@/components/Filter/Filter";
import DataFilter from "../DataFilter/DataFilter";
import Pagination from "@/components/Pagination/Pagination";
import * as XLSX from "xlsx";

const buttonColor = {
  Cancelado: "red",
  Pago: "teal",
  Pendente: "yellow",
  Reembolsado: "messenger",
};

const paymentColor = {
  "Não Pago": "red",
  Pago: "green",
};

const searchType = {
  por_nome: "[billing.first_name]",
  por_nome_aluno: "_billing_nome_aluno",
  por_email: "[billing.email]",
  por_passeio: "[line_items[0].name]",
  por_status: "status",
};

const typeSearch = {
  "[billing.first_name]": "por_nome",
  "[billing.email]": "por_email",
  _billing_nome_aluno: "por_nome_aluno",
  "[line_items[0].name]": "por_passeio",
  status: "por_status",
};

export default function OrdersList() {
  const {
    ord_filter,
    getOrders,
    _orders_search,
    setOrders_search,
    data,
    setData,
    itensPage,
    setItensPage,
  } = useOrders();

  const [busca, setBusca] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSearchitens = (value, name) => {
    setData({ ...data, [name]: value, page: 1 });
  };

  const handleSetfield = (value) => {
    setOrders_search({ ..._orders_search, field: value });
  };

  const handleSetvalue = (value) => {
    setTimeout(() => {
      setOrders_search({ ..._orders_search, value: value });
    }, 1500);
  };

  const searchOrders = () => {
    setItensPage({ ...itensPage, page: 1 });
    setReset(!reset);
    getOrders(data);
  };

  const logout = () => {
    localStorage.removeItem("viaLeoesToken");
    window.location.href = "/login";
  };
  const exportToExcel = () => {
    const treatement = ord_filter.list.map((item) => {
      return {
        Pedido: item["ID"],
        Responsável: item["Nome do cliente"],
        Aluno: item["Nome do aluno"],
        RG: item["RG"],
        CPF: item["CPF"],
        Telefone: item["Telefone"],
        Passeio: item["Passeio"],
        Série: item["Série"],
        Turma: item["Turma"],
        Pagamento: item["Data do pagamento"],
        Status: item["Status"],
      };
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(treatement);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "pedidos.xlsx");
  };

  const handleSetbusca = useCallback(() => {
    setBusca(!busca);
  });

  return (
    <>
      <Header
        exportToExcel={exportToExcel}
        logout={logout}
        handleSetbusca={handleSetbusca}
      ></Header>
      <div>
        {busca ? (
          <Container
            maxW="full"
            marginTop={"20px"}
            marginBottom={"20px"}
            display={"flex"}
            p={"0"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text
              fontWeight={"bold"}
              color={"viaLeoes"}
              textTransform={"uppercase"}
            >
              Pesquisar na base de dados por:
            </Text>
            <Filter
              handleSearchitens={handleSearchitens}
              searchOrders={searchOrders}
              data={data}
              searchType={searchType}
              typeSearch={typeSearch}
            />
            {ord_filter != null ? (
              <>
                <DataFilter
                  handleSetfield={handleSetfield}
                  handleSetvalue={handleSetvalue}
                  _orders_search={_orders_search}
                />
              </>
            ) : null}
          </Container>
        ) : null}
        {itensPage.totalPages != null ? (
          <Pagination
            handleSearch={getOrders}
            itemsTotal={itensPage.totalPages}
            actualPage={itensPage.page}
            data={data}
            resetPage={reset}
          />
        ) : null}
        <Container
          backgroundColor={"#eee"}
          position={"relative"}
          maxW="full"
          marginTop={"0px"}
          p={"0"}
          paddingBottom={"100px"}
        >
          <Grid
            padding={"30px"}
            maxW={"100%"}
            color={"#fff"}
            fontSize={"12px"}
            backgroundColor={"teal"}
            fontWeight={"600"}
            templateColumns="repeat(14, 1fr)"
            gap={2}
            borderBottom={"1px solid #eee"}
          >
            <GridItem colSpan={1}>Pedido</GridItem>
            <GridItem colSpan={2}>Responsável</GridItem>
            <GridItem colSpan={2}>Aluno</GridItem>
            <GridItem colSpan={1}>RG</GridItem>
            <GridItem colSpan={1}>CPF</GridItem>
            <GridItem colSpan={1}>Data de Nascimento</GridItem>
            <GridItem colSpan={1}>Telefone</GridItem>
            <GridItem colSpan={2}>Passeio</GridItem>
            <GridItem colSpan={1}>Série</GridItem>

            <GridItem colSpan={1}>Pagamento</GridItem>

            <GridItem colSpan={1}>Status</GridItem>
          </Grid>

          {ord_filter != null
            ? ord_filter.list.map((order) => (
                <Grid
                  onClick={() => exportToExcel()}
                  padding={"30px"}
                  maxW={"100%"}
                  fontSize={"12px"}
                  templateColumns="repeat(14, 1fr)"
                  key={order["ID"]}
                  gap={2}
                  borderBottom={"1px solid teal"}
                >
                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["Número do pedido"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={2}>
                    {order["Nome do cliente"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={2}>
                    {order["Nome do aluno"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["RG"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["CPF"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["Data de Nascimento"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["Telefone"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={2}>
                    {order["Passeio"]}
                  </GridItem>
                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["Série"]} {order["Turma"]}
                  </GridItem>

                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    {order["Data do pagamento"]}
                  </GridItem>

                  <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
                    <Badge
                      borderRadius={"5px"}
                      padding={"2"}
                      colorScheme={buttonColor[order["Status"]]}
                    >
                      {order["Status"]}
                    </Badge>
                  </GridItem>
                </Grid>
              ))
            : null}
        </Container>
      </div>
    </>
  );
}
