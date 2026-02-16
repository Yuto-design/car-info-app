import '../styles/SpecTable.css';

function SpecTable({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="spec-table-wrap">
      <table className="spec-table">
        <tbody>
          {items.map(({ label, value }) => (
            <tr key={label} className="spec-table-row">
              <th className="spec-table-label" scope="row">{label}</th>
              <td className="spec-table-value">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpecTable;
