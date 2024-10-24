import { useEffect, useState } from 'react';
import { store } from '../../../app/store';
import { Typography } from '../../../shared/components/ui/Typography';
import { useParams } from 'react-router-dom';
import { Branch, fetchBranchesById } from '../../../app/slices/branchSlice';
// import { fetchBranches } from '../../../shared/helpers/Branchs';

export const TableBranches = () => {
  const { Id } = useParams<{ Id: string }>();
  const [branches, setBranches] = useState<Branch[]>([]); // Cambia a un arreglo para manejar múltiples sucursales

  //   const fetchData = async () => {
  //     if (!Id) return;
  //     const response = await fetchBranches(Id);
  //     setBranches(response);
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   console.log(
  //     branches.map((branch) => branch._id),
  //     'branches'
  //   );

  //   console.log(
  //     branches.map((branch) => branch.nombre),
  //     'branches'
  //   );
  return (
    <>
      <div className="w-full justify-items-center">
        <Typography component="h3" bold>
          Tabla de branches
        </Typography>
        <div className="container--table">
          {branches.length > 0 ? (
            branches.map((branch) => <p key={branch._id}>{branch?.nombre}</p>)
          ) : (
            <p>No hay sucursales disponibles.</p>
          )}
        </div>
      </div>
    </>
  );
};
