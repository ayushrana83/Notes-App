import express from "express";
import {
  addProblemController,
  deleteProblemController,
  editProblemController,
  getAllProblemController,
  getProblemByIdController,
  searchProblemController,
  sortProblemController,
} from "../Controller/Problem";

const router = express.Router();

router.route("/all").get(getAllProblemController);
router.route("/add").post(addProblemController);
router.route("/edit").post(editProblemController);
router.route("/delete/:id").delete(deleteProblemController);
router.route("/search/:prefix").get(searchProblemController);
router.route("/sort/:field").get(sortProblemController);
router.route("/single/:id").get(getProblemByIdController);

export default router;
