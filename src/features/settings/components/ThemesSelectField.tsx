import { Box, Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useAxios from '../../../hooks/useAxios';
import { changeThemes } from '../settingsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';

const ThemesSelectField = () => {
  const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [themes, setThemes] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof themes>, child: any) => {
      const {
        target: { value },
      } = event;
      setThemes(
        typeof value === 'string' ? value.split(',') : value,
      );
      dispatch(changeThemes(value));
    };
  
  const { response, error, loading } = useAxios({ url : "questions_topics" });

  const topicOptions = response as string[];

  useEffect(() => {
    if(Array.isArray(topicOptions)) {
      setThemes(topicOptions);
    }
  }, [topicOptions]);

  if(loading) {
    return (
      <Box mt={20}>
        <CircularProgress></CircularProgress>
      </Box>
    )
  }

  if(error) {
    return (
      <Typography variant="h6" mt={20} color={"red"}>
        Something Went Wrong !
      </Typography>
    )
  }


  const EmptyBox = topicOptions.length % 2 === 1 ? <Box sx={{background:'linear-gradient(to right top, #6b00ff, #0200ff)', flexBasis:'50%'}}></Box> : null;

  return (
    <Box mt={3} width={"100%"}>
        <FormControl size='small' fullWidth>
          <InputLabel> Catégories </InputLabel>
            <Tooltip arrow title={<Typography variant="body2">{`Sélectionnez les catégories de questions qui vous intéressent.`}</Typography>} placement='right'>
              <Select multiple 
                      value={themes} 
                      label='Catégories'
                      id='themesSelect'
                      onChange={handleChange} 
                      renderValue={(selected) => (<Typography noWrap> {selected.map(sel => t(sel)).join(', ')} </Typography> )}>
                  { topicOptions.map((theme) => (
                    <MenuItem key={theme} value={theme} sx={{flexBasis:'50%'}}>
                      <Checkbox checked={themes.indexOf(theme) > -1} />
                      <ListItemText primary={t(theme)} />
                    </MenuItem>
                  ))}
                  {EmptyBox}
                </Select>
            </Tooltip>
        </FormControl>
    </Box>
  )
};

export default ThemesSelectField;

export {}
