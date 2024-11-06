import React, { useMemo } from "react";
import {
  type HttpError,
  useExport,
  useNavigation,
  useTranslate,
  useUpdate,
} from "@refinedev/core";
import {
  DateField,
  ExportButton,
  NumberField,
  useDataGrid,
} from "@refinedev/mui";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Paper from "@mui/material/Paper";
import { OrderStatus, OrderTableColumnProducts } from "../../components/order";
import type { IClub, IOrderFilterVariables } from "../../interfaces";
import { RefineListView } from "../../components";

export const OrderList = () => {
  const t = useTranslate();
  const { mutate } = useUpdate({ resource: "xxclubs" });

  const { dataGridProps, filters, sorters } = useDataGrid<
    IClub,
    HttpError,
    IOrderFilterVariables
  >({
    initialPageSize: 10,
  });

  const columns = useMemo<GridColDef<IClub>[]>(
    () => [
      {
        field: "orderNumber",
        headerName: t("orders.fields.order"),
        description: t("orders.fields.order"),
        renderCell: function render({ row }) {
          return <Typography>#{row.id}</Typography>;
        },
      },
      {
        field: "status.text",
        headerName: t("orders.fields.status"),
        width: 124,
        renderCell: function render({ row }) {
          return row.status;
        },
      },
      // {
      //   field: "products",
      //   headerName: t("orders.fields.products"),
      //   width: 184,
      //   sortable: false,
      //   renderCell: function render({ row }) {
      //     return <OrderTableColumnProducts order={row} />;
      //   },
      // },
      // {
      //   field: "amount",
      //   headerName: t("orders.fields.amount"),
      //   headerAlign: "center",
      //   align: "right",
      //   width: 120,
      //   renderCell: function render({ row }) {
      //     return (
      //       <NumberField
      //         options={{
      //           currency: "USD",
      //           style: "currency",
      //         }}
      //         value={row.amount}
      //       />
      //     );
      //   },
      // },
      // {
      //   field: "store",
      //   headerName: t("orders.fields.store"),
      //   width: 154,
      //   valueGetter: ({ row }) => row.store.title,
      //   sortable: false,
      // },
      // {
      //   field: "user.fullName",
      //   headerName: t("orders.fields.customer"),
      //   width: 154,
      //   valueGetter: ({ row }) => row.user.fullName,
      //   sortable: false,
      // },

      // {
      //   field: "createdAt",
      //   headerName: t("orders.fields.createdAt"),
      //   width: 200,
      //   renderCell: function render({ row }) {
      //     return <DateField value={row.createdAt} format="LL / hh:mm a" />;
      //   },
      // },
      // {
      //   field: "actions",
      //   type: "actions",
      //   headerName: t("table.actions"),
      //   sortable: false,
      //   headerAlign: "right",
      //   align: "right",
      //   getActions: ({ id }) => [
      //     <GridActionsCellItem
      //       key={1}
      //       icon={<CheckOutlinedIcon color="success" />}
      //       sx={{ padding: "2px 6px" }}
      //       label={t("buttons.accept")}
      //       showInMenu
      //       onClick={() => {
      //         mutate({
      //           id,
      //           values: {
      //             status: {
      //               id: 2,
      //               text: "Ready",
      //             },
      //           },
      //         });
      //       }}
      //     />,
      //     <GridActionsCellItem
      //       key={2}
      //       icon={<CloseOutlinedIcon color="error" />}
      //       sx={{ padding: "2px 6px" }}
      //       label={t("buttons.reject")}
      //       showInMenu
      //       onClick={() =>
      //         mutate({
      //           id,
      //           values: {
      //             status: {
      //               id: 5,
      //               text: "Cancelled",
      //             },
      //           },
      //         })
      //       }
      //     />,
      //   ],
      // },
    ],
    [t, mutate]
  );

  const { show } = useNavigation();

  const { isLoading, triggerExport } = useExport<IClub>({
    sorters,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        status: item.status,
        user_created: item.user_created,
        date_created: item.date_created,
        user_updated: item.user_updated,
        date_updated: item.date_updated,
        name: item.name,
        logo: item.logo,
      };
    },
  });

  return (
    <RefineListView
      headerButtons={
        <ExportButton
          variant="outlined"
          onClick={triggerExport}
          loading={isLoading}
          size="medium"
          sx={{ height: "40px" }}
        />
      }
    >
      <Paper>
        <DataGrid
          {...dataGridProps}
          columns={columns}
          onRowClick={({ id }) => {
            show("vvclubs", id);
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          sx={{
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
      </Paper>
    </RefineListView>
  );
};
