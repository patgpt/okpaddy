"use client";

import { motion } from "motion/react";
import {
  Button,
  Checkbox,
  Dialog,
  DropZone,
  FileTrigger,
  Form,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  Radio,
  RadioGroup,
  Section,
  Select,
  SelectValue,
  Switch,
  TabList,
  TabPanel,
  Tabs,
  TextArea,
  TextField,
  Tree,
} from "react-aria-components";

const make = motion.create;

export const MForm = make(Form);
export const MButton = make(Button);
export const MTextField = make(TextField);
export const MInput = make(Input);
export const MTextArea = make(TextArea);

export const MListBox = make(ListBox);
export const MItem = make(ListBoxItem);
export const MSection = make(Section);

export const MDialog = make(Dialog);
export const MPopover = make(Popover);

export const MSelect = make(Select);
export const MSelectValue = make(SelectValue);

export const MTabs = make(Tabs);
export const MTabList = make(TabList);
export const MTabPanel = make(TabPanel);

export const MSwitch = make(Switch);
export const MCheckbox = make(Checkbox);
export const MRadioGroup = make(RadioGroup);
export const MRadio = make(Radio);

export const MDropZone = make(DropZone);
export const MFileTrigger = make(FileTrigger);

export const MTree = make(Tree);

export { motion };
