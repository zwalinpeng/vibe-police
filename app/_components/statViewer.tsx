export default function StatViewer({ stats }: { stats: any }) {
  const stat_rows = stats.map(
    (stat: { name: string; avg: number }, index: number) => (
      <tr key={stat.name}>
        <td className="text-center">{index + 1}</td>
        <td>{stat.name}</td>
        <td className="text-center">
          {stat.name == "tempo"
            ? `${stat.avg.toFixed(1)} bpm`
            : `${(stat.avg * 100).toFixed(1)}%`}
        </td>
      </tr>
    )
  );
  return (
    <>
      <table className="border-white border-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Stat</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{stat_rows}</tbody>
      </table>
    </>
  );
}
