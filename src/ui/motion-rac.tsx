"use client";

import { motion } from "motion/react";
import {
  Button,
  Checkbox,
  ComboBox,
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
  Section, // TODO: remove this
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

export const MForm = motion.create(Form);
export const MButton = motion.create(Button);
export const MTextField = motion.create(TextField);
export const MInput = motion.create(Input);
export const MTextArea = motion.create(TextArea);

export const MListBox = motion.create(ListBox);
export const MListBoxItem = motion.create(ListBoxItem);
export const MSection = motion.create(Section);

export const MComboBox = motion.create(ComboBox);

export const MDialog = motion.create(Dialog);
export const MPopover = motion.create(Popover);

export const MSelect = motion.create(Select);
export const MSelectValue = motion.create(SelectValue);

export const MTabs = motion.create(Tabs);
export const MTabList = motion.create(TabList);
export const MTabPanel = motion.create(TabPanel);

export const MSwitch = motion.create(Switch);
export const MCheckbox = motion.create(Checkbox);
export const MRadioGroup = motion.create(RadioGroup);
export const MRadio = motion.create(Radio);

export const MDropZone = motion.create(DropZone);
export const MFileTrigger = motion.create(FileTrigger);

export const MTree = motion.create(Tree);
