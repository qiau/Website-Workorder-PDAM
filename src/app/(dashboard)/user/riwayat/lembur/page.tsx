import HistoryTable from "@/components/table/history-table/HistoryTable";

export default function LemburPage() {
  const role = 2;
  return (
    <>
      <HistoryTable type={2} role={role} />
    </>
  );
}
