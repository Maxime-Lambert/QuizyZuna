import { Box, Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Tooltip, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useAxios from '../../../hooks/useAxios';
import { changeThemes } from '../settingsSlice';
import { useAppDispatch } from '../../../app/hooks';
import { useTranslation } from 'react-i18next';

export default function ThemesSelectField () {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [themes, setThemes] = useState<string[]>([]);
  const [themesOptions, setThemesOptions] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof themes>, child: any) => {
    const {
      target: { value },
    } = event;
    setThemes(
      typeof value === 'string' ? value.split(',') : value,
    );
    dispatch(changeThemes(value));
  };

  const {getQuestionsThemesFunction} = useAxios();
  
  useEffect(() => {
    getQuestionsThemesFunction()
    .then(themesResponse => { setThemesOptions(themesResponse.data as string[]); setThemes(themesResponse.data as string[]); })
    .catch(err => {
      return (
        <CircularProgress></CircularProgress>
      );
    });
  }, []);

  const EmptyBox = themesOptions.length % 2 === 1 ? <Box sx={{background:'#283593', flexBasis:'50%'}}></Box> : null;

  return (
    <Box mt={3} width={"100%"}>
        <FormControl size='small' fullWidth>
          <InputLabel> Catégories </InputLabel>
            <Tooltip title={<Typography variant="body2">{`Sélectionnez les catégories de questions qui vous intéressent.`}</Typography>} placement='right'>
              <Select multiple 
                      value={themes} 
                      label='Catégories'
                      id='themesSelect'
                      onChange={handleChange} 
                      renderValue={(selected) => (<Typography noWrap> {selected.map(sel => t(sel)).join(', ')} </Typography> )}>
                  { themesOptions.map((theme) => (
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
