import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { addCar } from '../../data/cars';
import CarAdminForm, { emptyForm, normalizeFormToCarPatch } from './CarAdminForm';

function CarAdminRegister() {
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const patch = normalizeFormToCarPatch(form);

    if (!patch.name) {
      alert('車名は必須です');
      return;
    }
    if (!patch.maker) {
      alert('メーカーは必須です');
      return;
    }

    addCar(patch);
    setForm(emptyForm);
    navigate('/admin/cars');
  };

  return (
    <div className="car-admin">
      <div className="car-admin-header">
        <p className="car-admin-desc">
          新しい車種を登録します。
        </p>
        <div className="car-admin-actions">
          <Button as={Link} to="/list" variant="secondary">車一覧へ</Button>
          <Button as={Link} to="/admin/cars" variant="secondary">登録車の編集・削除へ</Button>
        </div>
      </div>

      <CarAdminForm
        title="車種を追加"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
        submitLabel="追加する"
      />
    </div>
  );
}

export default CarAdminRegister;
