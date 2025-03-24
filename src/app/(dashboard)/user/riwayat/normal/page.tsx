import HistoryTable from "@/components/table/history-table/HistoryTable";

export default function NormalPage() {
  const role = 2;
  return (
    <>
      <HistoryTable type={1} role={role} />
    </>
  );
}
