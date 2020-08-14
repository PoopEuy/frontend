import { useRouter } from "next/router";

//components OR parts local
import EditNojs from "@parts/TableNojs/editNojs";

const EditDataNojs = () => {
  const router = useRouter();
  const nojs = router.query.nojs;

  return <EditNojs id="APT1" nojs={nojs} back="/apt1/nojs" />;
};

export default EditDataNojs;
