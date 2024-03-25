import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import FormControlLabel from "@mui/material/FormControlLabel";
import ShortTextIcon from "@mui/icons-material/ShortText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import "./Question_form.css";
import {
  AccordionDetails,
  Button,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";

// eslint-disable-next-line react/prop-types
function Question_form({ questions, setQuestions }) {
  function changeQuestion(text, i) {
    const newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
  }

  function addQuestionType(i, type) {
    const qs = [...questions];

    if (type === "text") {
      qs[i].options = [];
    }
    qs[i].questionType = type;
    setQuestions(qs);
  }

  function changeOptionValue(text, i, j) {
    const qs = [...questions];
    qs[i].options[j] = text;
    setQuestions(qs);
  }

  function RemoveShoppingCartTwoTone(i, j) {
    const qs = [...questions];
    if (qs[i].options.length > 1) {
      qs[i].options.splice(j, 1);
      setQuestions(qs);
    }
  }

  function addOption(i) {
    const qs = [...questions];

    if (qs[i].options.length < 5) {
      qs[i].options.push("Option " + (qs[i].options.length + 1));
    }
    setQuestions(qs);
  }

  function copyQuestion(i) {
    expandCloseAll();
    const qs = [...questions];
    const newQuestion = { ...qs[i] };
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    const qs = [...questions];
    // eslint-disable-next-line react/prop-types
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }

  function requiredQuestion(i) {
    const qs = [...questions];

    qs[i].required = !qs[i].required;
    setQuestions(qs);
  }

  function addMoreQuestionField() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: ["Option 1"],
        open: true,
        required: false,
      },
    ]);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const qs = [...questions];
    const itemF = reorder(qs, result.source.index, result.destination.index);
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function expandCloseAll() {
    const qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  }

  function handleExpand(i) {
    const qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
      setQuestions(qs);
    }
  }

  function questionsUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: " 0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>
                <div>
                  <Accordion
                    expanded={questions[i].open}
                    className={questions[i].open ? "add border" : ""}
                    onChange={() => {
                      handleExpand(i);
                    }}
                  >
                    <AccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      elevation={1}
                      style={{ width: "100%" }}
                    >
                      {!questions[i].open ? (
                        <div className="saved_questions">
                          <Typography
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              letterSpacing: ".1px",
                              lineHeight: "24px",
                              paddingBottom: "8px",
                            }}
                          >
                            {i + 1}. {questions[i].questionText}
                          </Typography>

                          {ques.options.map((op, j) => (
                            <div key={j}>
                              <div style={{ display: "flex" }}>
                                <FormControlLabel
                                  style={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                  }}
                                  disabled
                                  control={
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      style={{ marginRight: "3px" }}
                                      required={ques.type}
                                    />
                                  }
                                  label={
                                    <Typography
                                      style={{
                                        fontFamily: "Roboto,Arial,sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "20px",
                                        color: "#202124",
                                      }}
                                    >
                                      {ques.options[j]}
                                    </Typography>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        ""
                      )}
                    </AccordionSummary>

                    {questions[i].open ? (
                      <div className="question_boxes">
                        <AccordionDetails className="add_question">
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question"
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                changeQuestion(e.target.value, i);
                              }}
                            ></input>
                            <Select
                              className="select"
                              defaultValue="Checkbox"
                              style={{
                                color: "#5f6368",
                                fontSize: "13px",
                              }}
                            >
                              <MenuItem
                                id="text"
                                value="Text"
                                onClick={() => {
                                  addQuestionType(i, "text");
                                }}
                              >
                                <SubjectIcon
                                  style={{
                                    marginRight: "10px",
                                    marginTop: "15px",
                                    color: "#70757a",
                                  }}
                                />
                                Paragraf
                              </MenuItem>
                              <MenuItem
                                id="text"
                                value="Checkbox"
                                onClick={() => {
                                  addQuestionType(i, "checkbox");
                                }}
                              >
                                <CheckBoxOutlinedIcon
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />
                                Onay Kutuları
                              </MenuItem>
                              <MenuItem
                                id="text"
                                value="Radio"
                                onClick={() => {
                                  addQuestionType(i, "radio");
                                }}
                              >
                                <RadioButtonCheckedOutlinedIcon
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />
                                Çoktan Seçmeli
                              </MenuItem>
                            </Select>
                          </div>
                          {ques.options.map((op, j) => (
                            <div className="add_question_body" key={j}>
                              {ques.questionType !== "text" ? (
                                <input
                                  type={ques.questionType}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : (
                                <ShortTextIcon
                                  style={{ marginRight: "10px" }}
                                />
                              )}
                              <div>
                                <input
                                  type="text"
                                  className="text_input"
                                  placeholder="option"
                                  value={ques.options[j].optionText}
                                  onChange={(e) => {
                                    changeOptionValue(e.target.value, i, j);
                                  }}
                                ></input>
                              </div>

                              <IconButton aria-label="delete">
                                <CloseIcon
                                  onClick={() => {
                                    RemoveShoppingCartTwoTone(i, j);
                                  }}
                                />
                              </IconButton>
                            </div>
                          ))}

                          {ques.options.length < 5 ? (
                            <div className="add_question_body">
                              <FormControlLabel
                                disabled
                                control={
                                  ques.questionType !== "text" ? (
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      // eslint-disable-next-line react/no-unknown-property
                                      inputProps={{
                                        "aria-label": "secondary checkbox",
                                      }}
                                      style={{
                                        marginLeft: "15px",
                                        marginRight: "10px",
                                      }}
                                      disabled
                                    />
                                  ) : (
                                    <ShortTextIcon
                                      style={{
                                        marginRight: "50px",
                                        height: "0px",
                                      }}
                                    />
                                  )
                                }
                                label={
                                  ques.questionType === "text" ? (
                                    ""
                                  ) : (
                                    <div>
                                      <input
                                        type="text"
                                        className="text_input"
                                        style={{
                                          fontSize: "13px",
                                          width: "60px",
                                        }}
                                        placeholder="Add other"
                                      ></input>
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          addOption(i);
                                        }}
                                        style={{
                                          textTransform: "none",
                                          color: "#4285f4",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                        }}
                                      >
                                        Add Option
                                      </Button>
                                    </div>
                                  )
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="add_footer">
                            <div className="add_question_bottom_left"></div>
                            <div className="add_question_bottom">
                              <IconButton
                                aria-label="Copy"
                                onClick={() => {
                                  copyQuestion(i);
                                }}
                              >
                                <FilterNoneOutlinedIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteQuestion(i);
                                }}
                              >
                                <DeleteOutlinedIcon
                                  style={{ fontSize: "30px" }}
                                />
                              </IconButton>
                              <IconButton>
                                <span
                                  style={{ color: "#5f6368", fontSize: "13px" }}
                                >
                                  Required
                                </span>{" "}
                                <Switch
                                  name="checkedA"
                                  color="primary"
                                  onClick={() => {
                                    requiredQuestion(i);
                                  }}
                                />
                              </IconButton>
                            </div>
                          </div>
                        </AccordionDetails>

                        <div className="question_edit">
                          <AddCircleOutlineOutlinedIcon
                            onClick={addMoreQuestionField}
                            className="edit"
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div>
      <div className="question_form">
        <br></br>
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="Untitled document"
              ></input>
              <input
                type="text"
                className="question_form_top_desc"
                placeholder="Form description"
              ></input>
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questionsUI()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default Question_form;
